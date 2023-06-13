package ir.sanatisharif.android.konkur96;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import android.animation.Animator;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;

import com.airbnb.lottie.LottieAnimationView;

public class SplashScreenActivity extends AppCompatActivity {

    private LottieAnimationView lottieAnimationView ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);
        init();
    }

    private void init(){

      setStatusBarColor();
      startMainActivity();

    }

    private void startMainActivity(){

      lottieAnimationView = findViewById(R.id.splash_alaa);

      lottieAnimationView.addAnimatorListener(new Animator.AnimatorListener() {
        @Override
        public void onAnimationStart(@NonNull Animator animation) {

        }

        @Override
        public void onAnimationEnd(@NonNull Animator animation) {

          Log.i("===>", "onAnimationEnd: ");
          Intent intent = new Intent(SplashScreenActivity.this , MainActivity.class);
          startActivity(intent);
        }

        @Override
        public void onAnimationCancel(@NonNull Animator animation) {

        }

        @Override
        public void onAnimationRepeat(@NonNull Animator animation) {

        }
      });


    }

    private void setStatusBarColor(){
      Window window = getWindow();

      // clear FLAG_TRANSLUCENT_STATUS flag:
      window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);

      // add FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS flag to the window
      window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);


      // finally change the color
      window.setStatusBarColor(ContextCompat.getColor(this,R.color.alaaPrimary));
    }

}
