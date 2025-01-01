import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-notification',
    imports: [CommonModule],
    template: `
        <div *ngIf="visible" [ngStyle]="{ 'background-color': color }" class="notification">{{ message }}</div>
    `,
    styles: [
        `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                color: white;
                padding: 16px;
                border-radius: 4px;
                transition: opacity 0.5s ease;
                opacity: 1;
            }
        `,
    ],
})
export class NotificationComponent implements OnInit {
    @Input() message: string = '';
    @Input() color: string = '';
    visible: boolean = false;

    ngOnInit(): void {}

    show() {
        this.visible = true;
        setTimeout(() => {
            this.fadeOut();
        }, 3000);
    }

    private fadeOut() {
        this.visible = false;
    }
}
