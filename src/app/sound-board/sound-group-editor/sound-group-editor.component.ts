import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    AlertController,
    IonButton,
    IonCol,
    IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, closeCircleOutline, trashOutline } from 'ionicons/icons';

import { debounceTime } from '../../shared/config';
import { colours, defaultSound, soundGroupSize } from '../sound-board.config';
import { Sound, SoundGroup } from '../sound-board.type';

addIcons({ closeCircleOutline, add, trashOutline });

@Component({
    selector: 'app-sound-group-editor',
    templateUrl: './sound-group-editor.component.html',
    imports: [
        IonGrid,
        IonRow,
        IonCol,
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        IonIcon,
        FormsModule,
    ],
    providers: [AlertController],
})
export class SoundGroupEditorComponent {
    private alertController = inject(AlertController);

    @Input() soundGroup!: SoundGroup;
    @Output() deleteSoundGroupEvent = new EventEmitter<SoundGroup['id']>();
    @Output() changeEvent = new EventEmitter();

    debounceTime = debounceTime;
    soundGroupSize = soundGroupSize;
    colours = colours;
    defaultSound = defaultSound;

    addSound = () => {
        this.soundGroup.sounds.push({} as Sound);
        this.change();
    };

    removeSound = (index: number) => {
        this.soundGroup.sounds = this.soundGroup.sounds.filter(
            (_, _index) => _index !== index,
        );
        this.change();
    };

    deleteSoundGroup = async () => {
        const alert = await this.alertController.create({
            header: 'Delete Sound Group',
            subHeader: 'This action cannot be undone.',
            message: `Are you sure you want to delete Sound Group: ${this.soundGroup.name}?`,
            buttons: [
                { text: 'Cancel', role: 'cancel' },
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () =>
                        this.deleteSoundGroupEvent.emit(this.soundGroup.id),
                },
            ],
        });

        await alert.present();
    };

    change = () => this.changeEvent.emit();
}
