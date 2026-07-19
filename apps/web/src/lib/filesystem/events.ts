export interface FileChangeEvent {
  type: 'created' | 'changed' | 'deleted';
  path: string;
}

type Listener = (events: FileChangeEvent[]) => void;

export class EventEmitter {
  private listeners = new Set<Listener>();

  fire(events: FileChangeEvent[]) {
    this.listeners.forEach((listener) => listener(events));
  }

  event(listener: Listener): { dispose: () => void } {
    this.listeners.add(listener);
    return {
      dispose: () => {
        this.listeners.delete(listener);
      },
    };
  }
}
