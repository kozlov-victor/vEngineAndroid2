package com.vengine_android.engine;

import android.opengl.GLUtils;

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

    @JniAccess
    public static int loadBitmap(String fileName) {
        return App.assets.loadBitmap(fileName);
    }

    @JniAccess
    public static void getBitmap(int target, int level ,int bitmap) {
        GLUtils.texImage2D(target,level,App.assets.getCachedBitmap(bitmap),0);
    }

}
