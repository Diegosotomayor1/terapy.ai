import { Component, Input } from '@angular/core'
import { messageType } from '../layout-chat.component'

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent {
  @Input() message?: {
    message: string
    date: string
    type: messageType['type']
  }
}
