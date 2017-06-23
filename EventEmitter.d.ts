type EventKey = string|RegExp;

interface EventMap {
    [evt: string]: EventKey;
}

type Events = EventKey|EventMap;

interface Listener {
    listener: Function;
    once: boolean;
}

interface ListenerMap {
    [evt: string]: Listener[];
}

type Listeners = Listener[]|ListenerMap;

declare class EventEmitter {
    getListeners(evt: EventKey): Listeners;
    flattenListeners(listeners: Listener[]): void;
    getListenersAsObject(evt: EventKey): ListenerMap;
    addListener(evt: EventKey, listener: Listener|Function): this;
    on(evt: EventKey, listener: Listener|Function): this;
    addOnceListener(evt: EventKey, listener: Function): this;
    once(evt: EventKey, listener: Function): this;
    defineEvent(evt: EventKey): this;
    defineEvents(evts: EventKey[]): this;
    removeListener(evt: EventKey, listener: Function): this;
    off(evt: EventKey, listener: Function): this;
    addListeners(evt: Events, listeners: Function[]): this;
    removeListeners(evt: Events, listeners: Function[]): this;
    manipulateListeners(remove: boolean, evt: Events, listeners: Function[]): this;
    removeEvent(evt: EventKey): this;
    removeAllListeners(evt: EventKey): this;
    emitEvent(evt: EventKey, args?: any[]): this;
    trigger(evt: EventKey, args?: any[]): this;
    emit(evt: EventKey): this;
    setOnceReturnValue(value: any): this;
}
