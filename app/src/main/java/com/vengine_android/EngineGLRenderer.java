package com.vengine_android;

import android.opengl.GLSurfaceView;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

public class EngineGLRenderer implements GLSurfaceView.Renderer {

    private final FPSCounter fpsCounter = new FPSCounter();

    @Override
    public void onSurfaceCreated(GL10 gl10, EGLConfig eglConfig) {
        VEngine.initV8();
        JsCompilationResult result = VEngine.compileScriptSource();
        if (!result.isSuccess()) {
            throw new RuntimeException("js error: "+result.getError());
        }
    }

    @Override
    public void onSurfaceChanged(GL10 gl10, int i, int i1) {

    }

    @Override
    public void onDrawFrame(GL10 gl10) {
        VEngine.updateFrame();
        fpsCounter.logFrame();
    }
}