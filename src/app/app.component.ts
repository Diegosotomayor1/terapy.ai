import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LayoutChatComponent } from './layout-chat/layout-chat.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Terapy.ai'
}
