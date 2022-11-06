package com.bitproject.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import com.bitproject.model.SMS;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;

@Component
public class SMSService {
    public static final String ACCOUNT_SID = "AC276ba4deba51da558106c5072fb2bce1";
    public static final String AUTH_TOKEN = "f3545dabfecd15d59166f291d669e887";
    public static final String FROM_NUMBER = "+18024713228";

    public void send(SMS sms) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(new PhoneNumber(sms.getTo()), new PhoneNumber(FROM_NUMBER), sms.getMessage())
                .create();
    }

    public void receive(MultiValueMap<String, String> smscallback) {
    }
}
