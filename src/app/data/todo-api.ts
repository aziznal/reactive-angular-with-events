import { Todo } from './../models/todo.model';
import { Injectable } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';

const artificalDelay = 200;

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  // mocked storage for todo items
  #todoItems: Todo[] = [
    {
      id: 1,
      title: 'Learn Angular',
      description: 'Learn the basics of Angular',
      completed: true,
    },
    {
      id: 2,
      title: 'Learn RxJS',
      description: 'Learn the basics of RxJS',
      completed: false,
    },
    {
      id: 3,
      title: 'Learn NgRx',
      description: 'Learn the basics of NgRx',
      completed: false,
    },
  ];

  async getTodoItems(): Promise<Todo[]> {
    await this.#sleep(artificalDelay);

    return this.#todoItems;
  }

  async addTodoItem(todoItem: Todo): Promise<void> {
    await this.#sleep(artificalDelay);

    this.#todoItems.push(todoItem);
  }

  async updateTodoItem(todoItem: Todo): Promise<void> {
    await this.#sleep(artificalDelay);

    const index = this.#todoItems.findIndex(item => item.id === todoItem.id);

    if (index > -1) {
      this.#todoItems[index] = todoItem;
    }
  }

  async deleteTodoItem(id: number): Promise<void> {
    await this.#sleep(artificalDelay);

    const index = this.#todoItems.findIndex(item => item.id === id);

    if (index > -1) {
      this.#todoItems.splice(index, 1);
    }
  }

  async reorderItem(fromIndex: number, toIndex: number): Promise<void> {
    await this.#sleep(artificalDelay);

    moveItemInArray(this.#todoItems, fromIndex, toIndex);
  }

  // helper to simulate latency
  #sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
