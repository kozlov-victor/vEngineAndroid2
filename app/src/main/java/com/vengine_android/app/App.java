package com.vengine_android.app;

import android.app.Application;
import android.content.Context;
import android.os.Looper;
import android.widget.Toast;

import com.vengine_android.assets.Assets;
import com.vengine_android.renderer.EngineGLRenderer;
import com.vengine_android.renderer.EngineGLSurfaceView;
import com.vengine_android.touch.TouchSurfaceDelegate;
import com.vengine_android.utils.SurfaceResizer;

public class App extends Application {

    public static EngineGLRenderer engineGLRenderer = new EngineGLRenderer();
    public static MainActivity mainActivity;

    public static TouchSurfaceDelegate touchSurfaceDelegate = new TouchSurfaceDelegate();
    public static EngineGLSurfaceView surfaceView;
    public static SurfaceResizer surfaceResizer = new SurfaceResizer();
    public static Assets assets = new Assets();

    private static Application sApplication;

    public static Application getApplication() {
        return sApplication;
    }

    public static Context getContext() {
        return getApplication().getApplicationContext();
    }

    @Override
    public void onCreate() {
        super.onCreate();
        sApplication = this;
        Thread.setDefaultUncaughtExceptionHandler((Thread th, Throwable e)->{
            new Thread() {
                @Override
                public void run() {
                    Looper.prepare();
                    Toast.makeText(sApplication,e.getMessage(),Toast.LENGTH_LONG).show();
                    Looper.loop();
                }
            }.start();
        });
    }
}