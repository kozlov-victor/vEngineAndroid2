package com.vengine_android;

import android.app.Application;
import android.content.Context;

public class App extends Application {

    public static EngineGLRenderer engineGLRenderer = new EngineGLRenderer();
    public static EngineGLSurfaceView surfaceView;
    public static SurfaceResizer surfaceResizer = new SurfaceResizer();

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
    }
}