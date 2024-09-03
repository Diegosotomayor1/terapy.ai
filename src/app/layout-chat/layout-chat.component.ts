import { StorageService } from './../services/storage/storage.service'
import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core'
import OpenAI from 'openai'
import { getAssistantList, sendMessageToAssitant } from '../../utils/service/openai'
import { InputMessageComponent } from './input-message/input-message.component'
import { MessageComponent } from './message/message.component'

export type messageType = {
  message: string
  date: Date
  type: 'user' | 'assistant'
}

@Component({
  selector: 'app-layout-chat',
  standalone: true,
  imports: [InputMessageComponent, MessageComponent],
  templateUrl: './layout-chat.component.html',
  styleUrl: './layout-chat.component.css',
  exportAs: 'appLayoutChat',
})
export class LayoutChatComponent implements OnInit {
  thread = signal<OpenAI.Beta.Threads.Thread | undefined>(undefined)
  message = signal<string>('')
  messages = signal<messageType[]>([
    {
      message:
        '¡Hola! 👋 Soy tu terapeuta 24/7, aquí para escucharte siempre. 🤖💙 ¿En qué puedo ayudarte hoy?',
      date: new Date(),
      type: 'assistant',
    },
  ])

  constructor(private StorageService: StorageService) {}
  @Output() messageChangeEvent = new EventEmitter<string>()

  ngOnInit() {
    const threadLS = JSON.parse(
      this.StorageService.getItem('thread') ?? 'null',
    ) as OpenAI.Beta.Threads.Thread | null
    if (threadLS) this.thread.set(threadLS)
    this.getListMessages()
  }

  private async getListMessages() {
    try {
      const response = await getAssistantList(this.thread())
      if (!this.thread()) {
        this.thread.set(response?.thread)
        localStorage.setItem('thread', JSON.stringify(response?.thread))
      }
      const contentMessages = response?.messages.reverse()
      if (!contentMessages) return
      this.messages.set(contentMessages)
    } catch (err) {
      console.log(err)
    }
  }

  private async sendMessage() {
    const message = this.message()
    this.messages.update((messages) => [
      ...messages,
      {
        message: message,
        date: new Date(),
        type: 'user',
      },
    ])
    await sendMessageToAssitant(message, this.thread())
  }

  messageParsed = (message: messageType) => ({
    message: message.message,
    date: Intl.DateTimeFormat('es-ES', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(message.date),
    type: message.type,
  })

  inputChange(message: string) {
    this.message.set(message)
  }

  async submitMessage($event: Event) {
    $event.preventDefault()
    const target = $event.target as HTMLFormElement
    target.reset()
    this.sendMessage()
    this.messages.update((prev) => [
      ...prev,
      {
        message: 'Cargando respuesta ...',
        date: new Date(),
        type: 'assistant',
      },
    ])
    this.getListMessages()
  }
}
