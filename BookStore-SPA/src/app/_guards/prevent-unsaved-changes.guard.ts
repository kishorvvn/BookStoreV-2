import { Injectable } from '@angular/core';
import { BookEditComponent } from '../booksMain/book-edit/book-edit.component';
import { CanDeactivate } from '@angular/router';


@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<BookEditComponent> {
    // pass in a component as we want access to editForm
    canDeactivate(component: BookEditComponent) {
        if (component.editForm.dirty){
            // if the form is dirty message will pop up. if user comfirms then user will be allowed to navigate to the requested page.
            // if user hits no button, message will be closed
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost!');
        }
        return true;
    }
}
