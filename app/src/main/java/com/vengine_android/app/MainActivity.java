package com.vengine_android.app;

import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.WindowManager;

import androidx.appcompat.app.AppCompatActivity;

import com.vengine_android.utils.Logger;
import com.vengine_android.R;
import com.vengine_android.engine.VEngine;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Logger.info("----activity on create------------");
        super.onCreate(savedInstanceState);

//        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
//                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_main);
        App.surfaceView = findViewById(R.id.engine_gl_surface_view);
        DisplayMetrics metrics = App.getContext().getResources().getDisplayMetrics();
        int widthPixels = metrics.widthPixels;
        int heightPixels = metrics.heightPixels;
        int min = Math.min(widthPixels, heightPixels);
        App.surfaceResizer.setSize(min,min);
        //FrameLayout frameLayout = findViewById(R.id.engine_gl_frame_view);
    }

    @Override
    protected void onDestroy() {
        Logger.info("----activity on destroy------------");
        super.onDestroy();
        VEngine.dispose();
        System.exit(0);
    }
}