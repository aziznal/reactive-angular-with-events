import { Todo } from '../models/todo.model';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { TodoApiService } from './todo-api';

interface TodoServiceState {
  data?: Todo[] | null;
  loading: boolean;
  error?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  state$ = new BehaviorSubject<TodoServiceState>({
    data: null,
    loading: false,
    error: null,
  });

  constructor(private todoApi: TodoApiService) {
    this.#loadInitialData();
  }

  get todos$(): Observable<TodoServiceState> {
    return this.state$;
  }

  async addTodoItem(todoItem: Todo): Promise<void> {
    this.state$.next({ ...this.state$.value, loading: true });

    try {
      await this.todoApi.addTodoItem(todoItem);

      await this.#refresh();
    } catch (error) {
      this.emit({ error: 'Something went wrong while adding TODO!' });
    } finally {
      this.emit({ loading: false });
    }
  }

  async updateTodoItem(todoItem: Todo): Promise<void> {
    this.emit({ loading: true });

    try {
      await this.todoApi.updateTodoItem(todoItem);

      await this.#refresh();
    } catch (error) {
      this.emit({ error: 'Something went wrong while updating TODO!' });
    } finally {
      this.emit({ loading: false });
    }
  }

  async deleteTodoItem(id: number): Promise<void> {
    this.emit({ loading: true });

    try {
      await this.todoApi.deleteTodoItem(id);

      await this.#refresh();
    } catch (error) {
      this.emit({ error: 'Something went wrong while deleting TODO!' });
    } finally {
      this.emit({ loading: false });
    }
  }

  async reorderItem(fromIndex: number, toIndex: number): Promise<void> {
    this.emit({ loading: true });

    try {
      await this.todoApi.reorderItem(fromIndex, toIndex);

      const data = await this.todoApi.getTodoItems();
      this.emit({ data });
    } catch (error) {
      this.emit({ error: 'Something went wrong while reordering TODOs!' });
    } finally {
      this.emit({ loading: false });
    }
  }

  async #loadInitialData() {
    this.emit({ loading: true });

    try {
      await this.#refresh();
    } catch (error) {
      this.emit({ error: 'Something went wrong while loading TODOs!' });
    } finally {
      this.emit({ loading: false });
    }
  }

  // method to emit state
  emit(state: Partial<TodoServiceState>): void {
    this.state$.next({ ...this.state$.value, ...state });
  }

  async #refresh(): Promise<void> {
    const data = await this.todoApi.getTodoItems();

    this.emit({ data });
  }

  ngOnDestroy(): void {
    this.state$.complete();
  }
}
