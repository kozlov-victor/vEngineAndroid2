package com.vengine_android;

import android.os.Bundle;
import android.widget.FrameLayout;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    static {
        System.loadLibrary("vengine_android");
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

//        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
//                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_main);
        App.surfaceView = findViewById(R.id.engine_gl_surface_view);
        //FrameLayout frameLayout = findViewById(R.id.engine_gl_frame_view);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        VEngine.dispose();
    }
}