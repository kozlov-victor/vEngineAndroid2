package com.vengine_android;

import android.content.Context;
import android.opengl.GLSurfaceView;
import android.util.AttributeSet;

public class EngineGLSurfaceView extends GLSurfaceView {

    private EngineGLRenderer engineGLRenderer;
    public EngineGLSurfaceView(Context context, AttributeSet attributeSet) {
        super(context, attributeSet);
        setEGLContextClientVersion(2);
        engineGLRenderer = new EngineGLRenderer();
        setRenderer(engineGLRenderer);
        setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }

    // todo destroy

}