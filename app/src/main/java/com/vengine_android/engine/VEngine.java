package com.vengine_android.engine;

import com.vengine_android.app.App;
import com.vengine_android.app.JsCompilationResult;

public class VEngine {

    static {
        System.loadLibrary("vengine_android");
    }

    public static JsCompilationResult compileScriptFromAsset(String assetFileName) {
        return compileScript(assetFileName, App.assets.readAsset(assetFileName));
    }

    public static native void initV8();
    public static native JsCompilationResult compileScript(String fileName, String source);
    public static native void updateFrame();

    public static native void dispose();

    @JniAccess
    public static void setSurfaceWidth(int width) {
        App.surfaceResizer.setWidth(width);
    }

    @JniAccess
    public static int getSurfaceWidth() {
        return App.surfaceResizer.getWidth();
    }

    @JniAccess
    public static void setSurfaceHeight(int height) {
        App.surfaceResizer.setHeight(height);
    }

    @JniAccess
    public static int getSurfaceHeight() {
        return App.surfaceResizer.getHeight();
    }

}
