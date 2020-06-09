package ir.sadad.los.security;

import com.google.common.collect.Lists;
import ir.bmi.identity.security.model.dto.GrantType;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Singular;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.util.Assert;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@ToString
@Getter
@EqualsAndHashCode(of = "name")
public class BmiOAuth2User implements OAuth2User {

  @Singular
  private Map<String, Object> attributes;

  @Singular
  private Collection<? extends GrantedAuthority> authorities;

  private String name;

  private String token;

  public BmiOAuth2User(Map<String, Object> attributes) {
    Assert.notNull(attributes, "attributes of BmiOAuth2User object must not null");
    this.attributes = attributes;
    this.authorities = extractAuthorities(attributes);
    Assert.notNull(getSsn(), "SSN of BmiOAuth2User object must not null");
    this.name = getSsn();
    this.token = getToken();
  }

  public Collection<? extends GrantedAuthority> extractAuthorities(Map<String, Object> attributes) {
    String role = "ROLE_ANONYMOUS";
    role = attributes.get("role") == null ? role : "ROLE_CLIENT";
    return Lists.newArrayList(new SimpleGrantedAuthority(role));
  }


  public String getIss() {
    return (String) attributes.get("iss");
  }

  public String getAud() {
    return (String) attributes.get("aud");
  }

  public Long getExp() {
    return (Long) attributes.get("exp");
  }

  public Long getNbf() {
    return (Long) attributes.get("nbf");
  }

  public String getClientId() {
    return (String) attributes.get("client_id");
  }

  public String getRole() {
    return (String) attributes.get("role");
  }

  public String getSerial() {
    return (String) attributes.get("serial");
  }

  public String getSsn() {
    return (String) attributes.get("ssn");
  }

  public String getToken() {
    return (String) attributes.get("token");
  }

  public List<String> getScopes() {
    return (List<String>) attributes.get("scopes");
  }

  public GrantType getGrant() {
    return (GrantType) attributes.get("grant");
  }


}
