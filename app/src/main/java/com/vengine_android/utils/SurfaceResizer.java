package com.vengine_android.utils;

import android.os.Handler;
import android.os.Looper;
import android.view.ViewGroup;

import com.vengine_android.app.App;


public class SurfaceResizer {

    public void setWidth(final int width){
        setSize(width,-1);
    }

    public int getWidth() {
        return App.surfaceView.getWidth();
    }

    public void setHeight(final int height){
        setSize(-1,height);
    }

    public void setSize(final int width, final int height){
        if (width==0) throw new RuntimeException("0");
        new Handler(Looper.getMainLooper()).post(()->{
            ViewGroup.LayoutParams params = App.surfaceView.getLayoutParams();
            if (width!=-1) params.width = width;
            if (height!=-1) params.height = height;
            App.surfaceView.setLayoutParams(params);
        });
    }

    public int getHeight() {
        return App.surfaceView.getHeight();
    }

}