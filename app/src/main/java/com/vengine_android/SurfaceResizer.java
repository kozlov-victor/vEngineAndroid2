package com.vengine_android;

import android.os.Handler;
import android.os.Looper;
import android.view.ViewGroup;


public class SurfaceResizer {

    public void setWidth(final int width){
        new Handler(Looper.getMainLooper()).post(()->{
            ViewGroup.LayoutParams params = App.surfaceView.getLayoutParams();
            params.width = width;
            App.surfaceView.setLayoutParams(params);
        });
    }

    public void setHeight(final int height){
        new Handler(Looper.getMainLooper()).post(()->{
            ViewGroup.LayoutParams params = App.surfaceView.getLayoutParams();
            params.height = height;
            App.surfaceView.setLayoutParams(params);
        });
    }

}