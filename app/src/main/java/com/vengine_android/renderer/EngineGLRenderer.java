package com.vengine_android.renderer;

import android.opengl.GLSurfaceView;
import android.util.DisplayMetrics;

import com.vengine_android.utils.FPSCounter;
import com.vengine_android.model.JsCompilationResult;
import com.vengine_android.utils.Logger;
import com.vengine_android.engine.VEngine;
import com.vengine_android.app.App;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

public class EngineGLRenderer implements GLSurfaceView.Renderer {

    private final FPSCounter fpsCounter = new FPSCounter();
    private boolean surfaceAlreadyCreated = false;
    private boolean resizeRequested = false;

    private void compileScriptFromLocalUrl(String assetUrl) {
        JsCompilationResult result = VEngine.compileScriptFromLocalUrl(assetUrl);
        if (!result.isSuccess()) {
            VEngine.dispose();
            throw new RuntimeException("js error: \n"+result.getError());
        }
    }

    private void compileScriptFromUrl(String url) {
        JsCompilationResult result = VEngine.compileScriptFromUrl(url);
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

    private void applyScreenSize() {
        DisplayMetrics metrics = App.getContext().getResources().getDisplayMetrics();
        int widthPixels = metrics.widthPixels;
        int heightPixels = metrics.heightPixels;
        compileInlineScript("innerWidth = "+widthPixels+";innerHeight = "+heightPixels+";");
    }

    public void requestResize() {
        this.resizeRequested = true;
    }

    @Override
    public void onSurfaceCreated(GL10 gl10, EGLConfig eglConfig) {
        Logger.info("------renderer on surface created----------" + this);
        if (surfaceAlreadyCreated) {
            // gl context was lost -> we can't handle that yet
            // generate contextlost event in JS?
            Logger.error("GL context lost. Cannot restore. Exiting.");
            System.exit(0);
        }
        VEngine.initV8();
        applyScreenSize();
        compileScriptFromLocalUrl("bootstrap.js");
        App.assets.setRemoteBaseUrl("http://vakozlov.zzz.com.ua/vEngine2/");
        compileScriptFromUrl("out/model3dFromObj6.js");
        surfaceAlreadyCreated = true;
    }

    @Override
    public void onSurfaceChanged(GL10 gl10, int i, int i1) {}

    @Override
    public void onDrawFrame(GL10 gl10) {
        VEngine.updateFrame();
        if (resizeRequested) {
            DisplayMetrics metrics = App.getContext().getResources().getDisplayMetrics();
            int widthPixels = metrics.widthPixels;
            int heightPixels = metrics.heightPixels;
            VEngine.onResize(widthPixels, heightPixels);
            resizeRequested = false;
        }
        App.touchSurfaceDelegate.updateFrame();
        fpsCounter.updateFrame();
    }
}