package com.vengine_android;

import android.content.Context;
import android.opengl.GLSurfaceView;
import android.util.AttributeSet;

public class EngineGLSurfaceView extends GLSurfaceView {

    public EngineGLSurfaceView(Context context, AttributeSet attributeSet) {
        super(context, attributeSet);
        setEGLContextClientVersion(2);
        App.engineGLRenderer = new EngineGLRenderer();
        setPreserveEGLContextOnPause(true);
        setRenderer(App.engineGLRenderer);
        setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }

}