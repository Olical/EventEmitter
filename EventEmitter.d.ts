export = EventEmitter.EventEmitter;
export as namespace EventEmitter;

declare namespace EventEmitter {
    type EventKey = string | RegExp;

    interface EventMap {
        [event: string]: EventKey;
    }

    type Events = EventKey | EventMap;

    interface Listener {
        listener: Function;
        once: boolean;
    }

    interface ListenerMap {
        [event: string]: Listener[];
    }

    type Listeners = Listener[] | ListenerMap;

    export class EventEmitter<E = EventKey> {
        static noConflict(): typeof EventEmitter;

        getListeners(event: E): Listeners;
        flattenListeners(listeners: Listener[]): void;
        getListenersAsObject(event: E): ListenerMap;
        addListener(event: E, listener: Listener | Function): this;
        on(event: E, listener: Listener | Function): this;
        addOnceListener(event: E, listener: Function): this;
        once(event: E, listener: Function): this;
        defineEvent(event: E): this;
        defineEvents(events: E[]): this;
        removeListener(event: E, listener: Function): this;
        off(event: E, listener: Function): this;
        addListeners(event: Events, listeners: Function[]): this;
        removeListeners(event: Events, listeners: Function[]): this;
        manipulateListeners(remove: boolean, event: Events, listeners: Function[]): this;
        removeEvent(event?: E): this;
        removeAllListeners(event?: E): this;
        emitEvent(event: E, args?: any[]): this;
        trigger(event: E, args?: any[]): this;
        emit(event: E, ...args: any[]): this;
        setOnceReturnValue(value: any): this;
    }
}
