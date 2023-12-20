package com.vengine_android.app;

import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.vengine_android.utils.Logger;
import com.vengine_android.R;
import com.vengine_android.engine.VEngine;

public class MainActivity extends AppCompatActivity implements View.OnTouchListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Logger.info("----activity on create------------");
        super.onCreate(savedInstanceState);
        App.mainActivity = this;
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_main);
        App.surfaceView = findViewById(R.id.engine_gl_surface_view);
        DisplayMetrics metrics = App.getContext().getResources().getDisplayMetrics();
        int widthPixels = metrics.widthPixels;
        int heightPixels = metrics.heightPixels;
        int min = Math.min(widthPixels, heightPixels);
        App.surfaceResizer.setSize(min,min);
        FrameLayout frameLayout = findViewById(R.id.engine_gl_frame_view);
        frameLayout.setOnTouchListener(this);
    }


    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        App.engineGLRenderer.requestResize();
    }

    @Override
    public boolean onTouch(View view, MotionEvent motionEvent) {
        App.touchSurfaceDelegate.onTouch(motionEvent);
        return true;
    }



    @Override
    protected void onDestroy() {
        Logger.info("----activity on destroy------------");
        super.onDestroy();
        VEngine.dispose();
        System.exit(0);
    }
}