package com.vengine_android.engine;

import android.app.AlertDialog;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.opengl.GLUtils;

import com.vengine_android.app.App;
import com.vengine_android.model.BitmapInfo;
import com.vengine_android.model.JsCompilationResult;

import java.nio.ByteBuffer;

public class VEngine {

    static {
        System.loadLibrary("vengine_android");
    }

    public static JsCompilationResult compileScriptFromLocalUrl(String assetFileName) {
        return compileScript(assetFileName, App.assets.loadStringFromLocalAsset(assetFileName));
    }

    public static JsCompilationResult compileScriptFromUrl(String url) {
        return compileScript(url, App.assets.loadString(url));
    }

    public static native void initV8();
    public static native JsCompilationResult compileScript(String fileName, String source);
    public static native void updateFrame();

    public static native void onTouchEvent(String eventName, float x, float y, int id);

    public static native void onResize(int width, int height);

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
    public static BitmapInfo loadBitmap(String fileName) {
        return App.assets.loadBitmap(fileName);
    }

    @JniAccess
    public static String loadString(String fileName) {
        return App.assets.loadString(fileName);
    }

    @JniAccess
    public static ByteBuffer loadBinary(String fileName) {
        return App.assets.loadBinary(fileName);
    }

    @JniAccess
    public static void getBitmap(int target, int level ,int bitmap) {
        GLUtils.texImage2D(target,level,App.assets.getCachedBitmap(bitmap),0);
    }

    @JniAccess
    public static void alert(String msg) {
        App.mainActivity.runOnUiThread(()->{
            new AlertDialog.Builder(App.mainActivity)
            .setMessage(msg).setPositiveButton("Ok",(dialogInterface, i) -> {
                dialogInterface.dismiss();
            })
            .create()
            .show();
        });
    }

    public static void setOrientation(boolean landscape) {
        App.mainActivity.runOnUiThread(()->{
            if (landscape) App.mainActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
            else App.mainActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
        });
    }

    @JniAccess
    public static void setBgColor(String color) {
        App.mainActivity.runOnUiThread(()->{
            App.frameLayout.setBackgroundColor(Color.parseColor(color));
        });
    }

}
