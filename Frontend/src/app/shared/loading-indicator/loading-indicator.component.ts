import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-loading-indicator',
    imports: [CommonModule, ProgressSpinnerModule],
    templateUrl: './loading-indicator.component.html',
    styleUrl: './loading-indicator.component.css',
})
export class LoadingIndicatorComponent {
    @Input() isLoading: boolean = false;
}
