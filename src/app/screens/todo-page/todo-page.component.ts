import { Todo } from './../../models/todo.model';
import { TodoLocalDataSource } from './../../data/todo-data-source.service';
import { Component } from '@angular/core';
import { CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent {
  constructor(public todoService: TodoLocalDataSource) {}

  todos$ = this.todoService.getTodoItems();

  async createTodo() {
    await this.todoService.addTodoItem({
      id: Math.floor(Math.random() * 1000),
      title: 'New Todo',
      description: 'New Todo Description',
      completed: false,
    });
  }

  async deleteTodo(id: number) {
    await this.todoService.deleteTodoItem(id);
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodoItem(todo);
  }

  moveTodoItem(event: CdkDragSortEvent) {
    this.todoService.reorderItem(event.previousIndex, event.currentIndex);
  }
}
