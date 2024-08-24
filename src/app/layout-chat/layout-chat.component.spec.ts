import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LayoutChatComponent } from './layout-chat.component'

describe('LayoutChatComponent', () => {
  let component: LayoutChatComponent
  let fixture: ComponentFixture<LayoutChatComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutChatComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LayoutChatComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
