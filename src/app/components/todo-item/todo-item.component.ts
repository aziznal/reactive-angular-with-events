import { Todo } from './../../models/todo.model';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit, OnChanges {
  @ViewChild('titleInput')
  titleInputRef!: ElementRef<HTMLInputElement>;

  @ViewChild('descriptionInput')
  descriptionInputRef!: ElementRef<HTMLInputElement>;

  @Input()
  todo!: Todo;

  @Output()
  updated = new EventEmitter<Todo>();

  @Output()
  deleted = new EventEmitter<number>();

  isEditMode = false;

  // used when editing a todo
  editedTodo: Todo = { ...this.todo };

  ngOnInit(): void {
    if (!this.todo) {
      throw new Error('Todo is not defined');
    }
  }

  ngOnChanges(): void { }

  complete(): void {
    this.update({ ...this.todo, completed: true });
  }

  uncomplete(): void {
    this.update({ ...this.todo, completed: false });
  }

  setCompletion(newState: boolean): void {
    if (newState) {
      this.complete();
    } else {
      this.uncomplete();
    }
  }

  update(updatedTodo: Todo): void {
    this.updated.emit(updatedTodo);
  }

  delete(): void {
    this.deleted.emit(this.todo.id);
  }

  _turnOnEditMode(options?: { focus?: 'description' | 'title' }) {
    this.isEditMode = true;

    this.editedTodo = { ...this.todo };

    if (options?.focus === 'title') {
      setTimeout(() => {
        this.titleInputRef.nativeElement.focus();
      });
    }

    if (options?.focus === 'description') {
      setTimeout(() => {
        this.descriptionInputRef.nativeElement.focus();
      });
    }
  }

  _turnOffEditMode() {
    this.isEditMode = false;

    this.update(this.editedTodo);
  }
}
