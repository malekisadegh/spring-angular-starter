package ir.sadad.los;

import ir.sadad.los.config.CommonConfigs;
import org.apache.camel.component.servlet.CamelHttpTransportServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Arrays;
import java.util.Collection;

@SpringBootApplication
public class LosApplication implements InitializingBean {

  private static final Logger log = LoggerFactory.getLogger(LosApplication.class);

  @Autowired
  private CommonConfigs commonConfigs;

  private final Environment env;

  public LosApplication(Environment env) {
    this.env = env;
  }

  public static void main(String[] args) {
    SpringApplication.run(LosApplication.class, args);
  }

  public void afterPropertiesSet() throws Exception {
    Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
    // SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);
    log.info("your application!  run with"
      + activeProfiles
      + "profiles at the same time.");
  }

}
