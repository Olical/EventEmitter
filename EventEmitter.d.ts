export = EventEmitter.EventEmitter;
export as namespace EventEmitter;

declare namespace EventEmitter {
    type EventKey = string|RegExp;

    interface EventMap {
        [event: string]: EventKey;
    }

    type Events = EventKey|EventMap;

    interface Listener {
        listener: Function;
        once: boolean;
    }

    interface ListenerMap {
        [event: string]: Listener[];
    }

    type Listeners = Listener[]|ListenerMap;

    export class EventEmitter {
        static noConflict(): typeof EventEmitter;

        getListeners(event: EventKey): Listeners;
        flattenListeners(listeners: Listener[]): void;
        getListenersAsObject(event: EventKey): ListenerMap;
        addListener(event: EventKey, listener: Listener|Function): this;
        on(event: EventKey, listener: Listener|Function): this;
        addOnceListener(event: EventKey, listener: Function): this;
        once(event: EventKey, listener: Function): this;
        defineEvent(event: EventKey): this;
        defineEvents(events: EventKey[]): this;
        removeListener(event: EventKey, listener: Function): this;
        off(event: EventKey, listener: Function): this;
        addListeners(event: Events, listeners: Function[]): this;
        removeListeners(event: Events, listeners: Function[]): this;
        manipulateListeners(remove: boolean, event: Events, listeners: Function[]): this;
        removeEvent(event?: EventKey): this;
        removeAllListeners(event?: EventKey): this;
        emitEvent(event: EventKey, args?: any[]): this;
        trigger(event: EventKey, args?: any[]): this;
        emit(event: EventKey, ...args: any[]): this;
        setOnceReturnValue(value: any): this;
    }
}
