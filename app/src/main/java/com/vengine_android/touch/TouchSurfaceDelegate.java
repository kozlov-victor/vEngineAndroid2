package com.vengine_android.touch;

import android.graphics.PointF;
import android.util.SparseArray;
import android.view.MotionEvent;

import com.vengine_android.engine.VEngine;
import com.vengine_android.utils.Logger;

public class TouchSurfaceDelegate {

    private final static String TOUCH_START = "ontouchstart";
    private final static String TOUCH_MOVE  = "ontouchmove";
    private final static String TOUCH_END   = "ontouchend";

    private final int MAX_TOUCHES = 10;
    private final TouchEvent[] touchEvents = new TouchEvent[MAX_TOUCHES];
    private final SparseArray<PointF> activePointers = new SparseArray<>();
    private boolean clean = true;

    public TouchSurfaceDelegate() {
        for (int i = 0; i < touchEvents.length; i++) {
            touchEvents[i] = new TouchEvent();
        }
    }

    private TouchEvent getFreeTouchEvent(){
        for (TouchEvent touchEvent : touchEvents) {
            if (!touchEvent.isDirty()) {
                this.clean = false;
                return touchEvent;
            }
        }
        return null;
    }

    private void dispatchEvent(float x, float y, int pointerID, String actionName) {
        TouchEvent touchEvent = getFreeTouchEvent();
        if (touchEvent==null) return;
        touchEvent.markDirty();
        touchEvent.setClientX(x);
        touchEvent.setClientY(y);
        touchEvent.setPointerId(pointerID);
        touchEvent.setEventName(actionName);
    }

    public void onTouch(MotionEvent e) {
        int maskedAction = e.getActionMasked(); //  (not specific to a pointer) action
        int actionIndex = e.getActionIndex();
        switch (maskedAction) {
            case MotionEvent.ACTION_DOWN:
            case MotionEvent.ACTION_POINTER_DOWN: {
                int id = e.getPointerId(actionIndex);
                float x = e.getX(actionIndex);
                float y = e.getY(actionIndex);
                PointF pointF = new PointF(x,y);
                activePointers.put(id,pointF);
                dispatchEvent(x, y, id, TOUCH_START);
                break;
            }
            case MotionEvent.ACTION_MOVE: { // a pointer was moved
                for (int size = e.getPointerCount(), i = 0; i < size; i++) {
                    int id = e.getPointerId(i);
                    float x = e.getX(i);
                    float y = e.getY(i);
                    PointF pointerDown = activePointers.get(id);
                    if (pointerDown==null) break;
                    boolean theSameCoords =
                            pointerDown.x==x &&
                            pointerDown.y==y;
                    if (!theSameCoords) {
                        dispatchEvent(x,y, id, TOUCH_MOVE);
                        pointerDown.x = x;
                        pointerDown.y = y;
                    }
                }
                break;
            }
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_POINTER_UP:
            case MotionEvent.ACTION_CANCEL: {
                int id = e.getPointerId(actionIndex);
                float x = e.getX(actionIndex);
                float y = e.getY(actionIndex);
                activePointers.remove(id);
                dispatchEvent(x,y, id, TOUCH_END);
                break;
            }
            default: {
                Logger.error("unknown maskedAction: " + maskedAction);
            }
        }

    }

    public void updateFrame() {
        if (clean) return;
        for (TouchEvent touchEvent : touchEvents) {
            if (!touchEvent.isDirty()) return;
            //v8Arguments.add("0",touchEvent.prepareAndGetNativeObject());
            //((V8Function)(globalCanvas.getObject(touchEvent.getEventName()))).call(runtime,v8Arguments);

            VEngine.compileScript("<inline>",
                "_globalGL.canvas['"+touchEvent.getEventName()+"']"+
                        "(" +
                        "{" +
                        "   preventDefault:()=>{}," +
                        "   touches:[{clientX:"+touchEvent.getClientX()+",clientY:"+touchEvent.getClientY()+",pointerId:"+touchEvent.getPointerId()+"}]," +
                        "   changedTouches:[{clientX:"+touchEvent.getClientX()+",clientY:"+touchEvent.getClientY()+",pointerId:"+touchEvent.getPointerId()+"}]" +
                        "}" +
                        ");"
            );

            touchEvent.markAsClean();
        }
        this.clean = true;
    }

}
