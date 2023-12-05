package com.vengine_android.renderer;

import android.content.Context;
import android.opengl.GLSurfaceView;
import android.util.AttributeSet;

import com.vengine_android.app.App;

public class EngineGLSurfaceView extends GLSurfaceView {

    public EngineGLSurfaceView(Context context, AttributeSet attributeSet) {
        super(context, attributeSet);
        setEGLContextClientVersion(2);
        App.engineGLRenderer = new EngineGLRenderer();
        setPreserveEGLContextOnPause(true);
        setRenderer(App.engineGLRenderer);
        setDebugFlags(DEBUG_CHECK_GL_ERROR | DEBUG_LOG_GL_CALLS);
        setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }





}