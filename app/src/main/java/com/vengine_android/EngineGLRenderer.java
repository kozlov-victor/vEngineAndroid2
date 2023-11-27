package com.vengine_android;

import android.opengl.GLES20;
import android.opengl.GLSurfaceView;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

public class EngineGLRenderer implements GLSurfaceView.Renderer {

    private final FPSCounter fpsCounter = new FPSCounter();
    private boolean surfaceAlreadyCreated = false;

    private void compileScriptFromAsset(String assetFileNAme) {
        JsCompilationResult result = VEngine.compileScriptFromAsset(assetFileNAme);
        if (!result.isSuccess()) {
            VEngine.dispose();
            throw new RuntimeException("js error: \n"+result.getError());
        }
    }

    private void compileInlineScript(String script) {
        JsCompilationResult result = VEngine.compileScript("<inline>",script);
        if (!result.isSuccess()) {
            VEngine.dispose();
            throw new RuntimeException("js error: "+result.getError());
        }
    }

    @Override
    public void onSurfaceCreated(GL10 gl10, EGLConfig eglConfig) {
        if (surfaceAlreadyCreated) {
            // gl context was lost -> we can't handle that yet
            // generate contextlost event in JS?
            System.err.println("GL context lost. Cannot restore. Exiting.");
            System.exit(0);
        }
        VEngine.initV8();
        compileScriptFromAsset("bootstrap.js");
        compileScriptFromAsset("index2.js");
        surfaceAlreadyCreated = true;
    }

    @Override
    public void onSurfaceChanged(GL10 gl10, int w, int h) {
//        GLES20.glViewport(0, 0, w, h);
//        if (runtime!=null) {
//            runtime.executeVoidScript(String.format("innerWidth = %d;innerHeight = %d;",width,height));
//            runtime.executeVoidScript("_triggerEvent('resize')");
//        }
    }

    @Override
    public void onDrawFrame(GL10 gl10) {
        VEngine.updateFrame();
        fpsCounter.logFrame();
    }
}