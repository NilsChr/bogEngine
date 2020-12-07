type TCallBack<T extends any = any> = (...args: T[]) => boolean | void;

const subscriptions: { [key: string]: TCallBack[] } = {};

interface ISubscription<T> {
  eventName: string;
  callback: TCallBack<T>;
}

export const EventManager = {
  unsubscribe<T>({ eventName, callback }: ISubscription<T>) {
    if (!subscriptions[eventName]) {
      return;
    }
    const index = subscriptions[eventName].findIndex((l) => l === callback);
    if (index < 0) {
      return;
    }
    subscriptions[eventName].splice(index, 1);
  },
  subscribe<T>({ eventName, callback }: ISubscription<T>) {
    if (!subscriptions[eventName]) {
      subscriptions[eventName] = [];
    }
    subscriptions[eventName].push(callback);
    return () => this.unsubscribe({ eventName, callback });
  },

  emit<T>(eventName: string, ...args: T[]) {
    if (!subscriptions[eventName]) {
      return;
    }
    for (const callback of subscriptions[eventName]) {
      const result = callback(...args);
      if (result === false) {
        break;
      }
    }
  },
};
