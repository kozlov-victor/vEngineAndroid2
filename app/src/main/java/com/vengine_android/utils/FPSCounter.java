package com.vengine_android.utils;

import android.util.Log;

public class FPSCounter {
    private long startTime = System.nanoTime();
    private int frames = 0;

    public void logFrame() {
        frames++;
        if(System.nanoTime() - startTime >= 1000000000) {
            Log.d("FPSCounter", "fps: " + frames);
            frames = 0;
            startTime = System.nanoTime();
        }
    }
}