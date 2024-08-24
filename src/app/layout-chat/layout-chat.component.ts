import { Component, EventEmitter, Output, signal } from '@angular/core';
import { InputMessageComponent } from './input-message/input-message.component';
import { MessageComponent } from './message/message.component';

export type messageType = {
  message: string;
  date: Date;
  type: 'sent' | 'received';
}

@Component({
  selector: 'app-layout-chat',
  standalone: true,
  imports: [InputMessageComponent, MessageComponent],
  templateUrl: './layout-chat.component.html',
  styleUrl: './layout-chat.component.css',
  exportAs: 'appLayoutChat'
})

export class LayoutChatComponent {
  message = signal<string>('');
  messages = signal<messageType[]>([{
    message: '¡Hola! 👋 Soy tu terapeuta 24/7, aquí para escucharte siempre. 🤖💙 ¿En qué puedo ayudarte hoy?',
    date: new Date(),
    type: 'received'
  }]);
  messageParsed = (message: messageType) => ({
     message: message.message,
     date: Intl.DateTimeFormat('es-ES', { hour: 'numeric', minute: 'numeric' }).format(message.date),
     type: message.type
  })

  @Output() messageChangeEvent = new EventEmitter <string>();

  inputChange(message: string) {
    this.message.set(message)
  }

  submitMessage($event: Event) {
    $event.preventDefault();
    const target = $event.target as HTMLFormElement;
    const message = this.message();
    this.messages.update(
      (messages) => [...messages, {
        message: message,
        date: new Date(),
        type: 'sent'
      }]
    )
    target.reset()
  }

}
