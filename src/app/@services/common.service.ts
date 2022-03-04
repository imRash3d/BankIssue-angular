import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfig } from '../@app-config/app-config.constant';

@Injectable({
    providedIn: 'root',
})
export class CommonService {

    constructor(private _snackBar: MatSnackBar) { }


    showMessage(message) {
        
        this._snackBar.open(message, null, {
            duration: AppConfig.snackBar.Duration,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
            panelClass: AppConfig.snackBar.PanelClass
        });
    }
}