#config database environment variable

export DB_CONNECTION=mongodb
export DB_HOST=0.0.0.0
export DB_PORT=27017
export DB_NAME=real_time_chat
export DB_USERNAME=""
export DB_PASSWORD=""

#config app environment vảiable
export APP_HOST=localhost
export APP_PORT=8017

#config admin email account
export MAIL_USER=khoaiga0103@gmail.com
export MAIL_PASSWORD=bavdeqxublgytite
export MAIL_HOST=smtp.gmail.com
export MAIL_PORT=587

#config facebook login app
export FB_APP_ID=801382054852813
export FB_APP_SECRET=3eb4e316c4050a27fe9acfdb9d94f2e0
export FB_CALLBACK_URL=http://localhost:8017/auth/facebook/callback

#config google login app
export GG_APP_ID=90050219803-ncdjombe785pq9528ol7jbho3v2v426u.apps.googleusercontent.com
export GG_APP_SECRET=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
export GG_CALLBACK_URL=http://localhost:8017/auth/google/callback