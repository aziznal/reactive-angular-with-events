import { Todo } from '../models/todo.model';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, delay, mergeMap, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { TodoApiService } from './todo-api';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  #todoItems$: Subject<Todo[]> = new Subject();

  // whether an async operation is in progress
  loading$ = new BehaviorSubject(true);

  constructor(private todoApi: TodoApiService) {
    this.#loadInitialData();
  }

  get todos$(): Observable<Todo[]> {
    return this.#todoItems$;
  }

  async addTodoItem(todoItem: Todo): Promise<void> {}

  async updateTodoItem(todoItem: Todo): Promise<void> {}

  async deleteTodoItem(id: number): Promise<void> {}

  async reorderItem(fromIndex: number, toIndex: number): Promise<void> {}

  async #loadInitialData() {
    this.loading$.next(true);

    this.#todoItems$.next(await this.todoApi.getTodoItems());

    this.loading$.next(false);
  }

  ngOnDestroy(): void {
    this.#todoItems$.complete();
    this.loading$.complete();
  }
}
