package com.vengine_android.touch;

public class TouchEvent {

    private boolean dirty;

    private float clientX;
    private float clientY;
    private int pointerId;
    private String eventName;

    public TouchEvent() {

    }

    public boolean isDirty(){
        return this.dirty;
    }

    public void markAsClean(){
        this.dirty = false;
    }

    public void markDirty(){
        this.dirty = true;
    }

    public float getClientX() {
        return clientX;
    }

    public void setClientX(float clientX) {
        this.clientX = clientX;
    }

    public float getClientY() {
        return clientY;
    }

    public void setClientY(float clientY) {
        this.clientY = clientY;
    }

    public int getPointerId() {
        return pointerId;
    }

    public void setPointerId(int pointerId) {
        this.pointerId = pointerId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    @Override
    public String toString() {
        return eventName + ",id=" + pointerId + "), " + clientX + ", " + clientY;
    }

    //    public V8Object prepareAndGetNativeObject(){
//        v8TouchInfo.add("clientX",clientX);
//        v8TouchInfo.add("clientY",clientY);
//        v8TouchInfo.add("pointerId",pointerId);
//        return v8TouchEvent;
//    }
}
