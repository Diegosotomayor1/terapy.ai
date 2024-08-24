import { Component, EventEmitter, Output } from '@angular/core'
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { LucideAngularModule } from 'lucide-angular'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-input-message',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatLabel, LucideAngularModule, MatButtonModule],
  templateUrl: './input-message.component.html',
  styleUrl: './input-message.component.css',
})
export class InputMessageComponent {
  @Output() messageChangeEvent = new EventEmitter<string>()
  inputChange(event: Event) {
    this.messageChangeEvent.emit((event.target as HTMLInputElement).value)
  }
}
