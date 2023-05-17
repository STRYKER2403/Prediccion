from datetime import datetime as dt
import yfinance as yf
from dash.exceptions import PreventUpdate
import pandas as pd
import plotly.graph_objs as go
import plotly.express as px
# model
from model import prediction
from sklearn.svm import SVR
from flask import Flask,request
import plotly.io as pio
from flask_cors import CORS, cross_origin
import requests
from bs4 import BeautifulSoup


# web scrap top gainers losers NSE/BSE 
url = "https://economictimes.indiatimes.com/marketstats/duration-1d,exchange-nse,pageno-1,pid-0,sort-intraday,sortby-percentchange,sortorder-desc.cms"
ntl_url = "https://economictimes.indiatimes.com/marketstats/duration-1d,exchange-nse,pageno-1,pid-1,sort-intraday,sortby-percentchange,sortorder-asc.cms"
btg_url = "https://economictimes.indiatimes.com/marketstats/duration-1d,exchange-bse,pageno-1,pid-0,sort-intraday,sortby-percentchange,sortorder-desc.cms"
btl_url = "https://economictimes.indiatimes.com/marketstats/duration-1d,exchange-bse,pageno-1,pid-1,sort-intraday,sortby-percentchange,sortorder-asc.cms"

r = requests.get(url)
ntl_r = requests.get(ntl_url)
btg_r = requests.get(btg_url)
btl_r = requests.get(btl_url)

htmlContent = r.content
ntl_htmlContent = ntl_r.content
btg_htmlContent = btg_r.content
btl_htmlContent = btl_r.content

soup = BeautifulSoup(htmlContent,"html.parser")
ntl_soup = BeautifulSoup(ntl_htmlContent,"html.parser")
btg_soup = BeautifulSoup(btg_htmlContent,"html.parser")
btl_soup = BeautifulSoup(btl_htmlContent,"html.parser")


server = Flask(__name__)

CORS(server)

def get_stock_price_fig(df):

    fig = go.Figure(px.line(df,
                  x="Date",
                  y=["Close", "Open"],
                  title="Closing and Opening Price vs Date"))

    return fig

def get_Nifty_Sensex_fig(df):

    fig = go.Figure(px.line(df,
                  x="Datetime",
                  y=["Close", "Open"],
                  title="Closing and Opening Price vs Date"))

    return fig


def get_more(df):
    df['EWA_20'] = df['Close'].ewm(span=20, adjust=False).mean()
    fig = px.scatter(df,
                     x="Date",
                     y="EWA_20",
                     title="Exponential Moving Average vs Date")
    fig.update_traces(mode='lines+markers')
    return fig

# NSE

# NSE TOP GAINERS INFO
# top gainers name
top_gainers = []
tgainers = soup.find_all("p",class_="flt w150")
for p_tag in tgainers:
    anchor = p_tag.find_all(recursive=False)
    for i in anchor:
        top_gainers.append(i.get_text())

# top gainers ltp
ltp = []
last_traded_price = soup.find_all("span",class_="ltp")
for item in last_traded_price:
    ltp.append(item.get_text())

# change in price 
change = []
cp = soup.find_all("span",class_="change")
for item in cp:
    change.append(item.get_text())

# change price percentage
change_percent = []
cpp =  soup.find_all("span",class_="pchange")   
for item in cpp:
    change_percent.append(item.get_text())

# top gainers volume 
volume = []
vol =  soup.find_all("span",class_="vol")   
for item in vol:
    volume.append(item.get_text())

# top gainers day's low
day_low = []   
dl = soup.find_all("span",class_="flt") 
for item in dl:
    if(item.get_text() != ""):
        day_low.append(item.get_text())

# top gainers day's high
day_high = []   
dh = soup.find_all("span",class_="flr") 
for item in dh:
    if(item.get_text() != ""):
        day_high.append(item.get_text())
  


# NSE TOP LOSERS INFO  
# top losers name
top_losers = []
tlosers = ntl_soup.find_all("p",class_="flt w150")
for p_tag in tlosers:
    anchor = p_tag.find_all(recursive=False)
    for i in anchor:
        top_losers.append(i.get_text())

# top losers ltp
ntl_ltp = []
last_traded_price = ntl_soup.find_all("span",class_="ltp")
for item in last_traded_price:
    ntl_ltp.append(item.get_text())

# change in price 
ntl_change = []
cp = ntl_soup.find_all("span",class_="change")
for item in cp:
    ntl_change.append(item.get_text())

# change price percentage
ntl_change_percent = []
cpp =  ntl_soup.find_all("span",class_="pchange")   
for item in cpp:
    ntl_change_percent.append(item.get_text())

# top losers volume 
ntl_volume = []
vol = ntl_soup.find_all("span",class_="vol")   
for item in vol:
    ntl_volume.append(item.get_text())

# top losers day's low
ntl_day_low = []   
dl = ntl_soup.find_all("span",class_="flt") 
for item in dl:
    if(item.get_text() != ""):
        ntl_day_low.append(item.get_text())

# top losers day's high
ntl_day_high = []   
dh = ntl_soup.find_all("span",class_="flr") 
for item in dh:
    if(item.get_text() != ""):
        ntl_day_high.append(item.get_text())
       

# BSE 

# BSE TOP GAINERS INFO
# top gainers name 
bse_top_gainers = []
tgainers = btg_soup.find_all("p",class_="flt w150")
for p_tag in tgainers:
    anchor = p_tag.find_all(recursive=False)
    for i in anchor:
        bse_top_gainers.append(i.get_text())

# top gainers ltp
btg_ltp = []
last_traded_price = btg_soup.find_all("span",class_="ltp")
for item in last_traded_price:
    btg_ltp.append(item.get_text())

# change in price 
btg_change = []
cp = btg_soup.find_all("span",class_="change")
for item in cp:
    btg_change.append(item.get_text())

# change price percentage
btg_change_percent = []
cpp =  btg_soup.find_all("span",class_="pchange")   
for item in cpp:
    btg_change_percent.append(item.get_text())

# top gainers volume 
btg_volume = []
vol =  btg_soup.find_all("span",class_="vol")   
for item in vol:
    btg_volume.append(item.get_text())

# top gainers day's low
btg_day_low = []   
dl = btg_soup.find_all("span",class_="flt") 
for item in dl:
    if(item.get_text() != ""):
        btg_day_low.append(item.get_text())

# top gainers day's high
btg_day_high = []   
dh = btg_soup.find_all("span",class_="flr") 
for item in dh:
    if(item.get_text() != ""):
        btg_day_high.append(item.get_text())


# BSE TOP LOSERS INFO
# top losers name
bse_top_losers = []
tlosers = btl_soup.find_all("p",class_="flt w150")
for p_tag in tlosers:
    anchor = p_tag.find_all(recursive=False)
    for i in anchor:
        bse_top_losers.append(i.get_text())

# top losers ltp
btl_ltp = []
last_traded_price = btl_soup.find_all("span",class_="ltp")
for item in last_traded_price:
    btl_ltp.append(item.get_text())

# change in price 
btl_change = []
cp = btl_soup.find_all("span",class_="change")
for item in cp:
    btl_change.append(item.get_text())

# change price percentage
btl_change_percent = []
cpp =  btl_soup.find_all("span",class_="pchange")   
for item in cpp:
    btl_change_percent.append(item.get_text())

# top losers volume 
btl_volume = []
vol = btl_soup.find_all("span",class_="vol")   
for item in vol:
    btl_volume.append(item.get_text())

# top losers day's low
btl_day_low = []   
dl = btl_soup.find_all("span",class_="flt") 
for item in dl:
    if(item.get_text() != ""):
        btl_day_low.append(item.get_text())

# top losers day's high
btl_day_high = []   
dh = btl_soup.find_all("span",class_="flr") 
for item in dh:
    if(item.get_text() != ""):
        btl_day_high.append(item.get_text())

# Route for company info
@server.route('/cinfo',methods = ['GET','POST'])
@cross_origin(supports_credentials=True) 
def update_data():  # input parameter(s)
    if request.method == 'POST':
        try:
            data = request.get_json()
            n = data['clicks']
            val = data['symbol']
            length = len(val)
            val = val[:length-2] + 'N' + val[(length - 2)+1:]
            val = val[:length-1] + 'S' + val[(length - 1)+1:]

            if n == None:
                return [""]
                # raise PreventUpdate
            else:
                if val == None:
                    raise PreventUpdate
                else:
                    ticker = yf.Ticker(val)
                    inf = ticker.info
                    df = pd.DataFrame().from_dict(inf, orient="index").T
                    df[[ 'shortName', 'longBusinessSummary']]
                    lbs = df['longBusinessSummary'].values[0]
                    sn = df['shortName'].values[0]
                    return [lbs,sn],200
        except:
            return {"success":False},400    


# Route for stocks graphs
@server.route('/stockgraph',methods = ['GET','POST'])
@cross_origin(supports_credentials=True) 
def stock_price(): 
    if request.method == 'POST':
        try:   
            data = request.get_json()
            n = data['clicks']
            start_date = data['dates'][0]
            end_date = data['dates'][1]
            val = data['symbol']

            if n == None:
                return [""]
                #raise PreventUpdate
            if val == None:
                raise PreventUpdate
            else:
                if start_date != None:
                    df = yf.download(val, str(start_date), str(end_date))
                else:
                    df = yf.download(val)

            df.reset_index(inplace=True)
            fig = get_stock_price_fig(df)
            gph_json = pio.to_json(fig)
            return gph_json,200
        except:
            return {"success":False},400

        

# Route for indicators graph
@server.route('/indicatorsgraph',methods = ['GET','POST'])
@cross_origin(supports_credentials=True) 
def indicators():
    if request.method == 'POST':
        try:
            data = request.get_json()
            n = data['clicks']
            start_date = data['dates'][0]
            end_date = data['dates'][1]
            val = data['symbol']

            if n == None:
                return [""]
            if val == None:
                return [""]

            if start_date == None:
                df_more = yf.download(val)
            else:
                df_more = yf.download(val, str(start_date), str(end_date))

            df_more.reset_index(inplace=True)
            fig = get_more(df_more)
            gph_json = pio.to_json(fig)
            
            return gph_json,200
        except:
            return {"success":False},400

# Route for Nifty,Sensex graph
@server.route('/nsgraph',methods = ['GET','POST'])
@cross_origin(supports_credentials=True) 
def Nifty_Sensex():
    try: 
        data = request.get_json()
        val = data['symbol']

        if val == None:
            return [""]

        try:
            df_more = yf.download(val, period='1d', interval='1m')
        except:
            return {"success":False},400

        df_more.reset_index(inplace=True)
        fig = get_Nifty_Sensex_fig(df_more)
        gph_json = pio.to_json(fig)
        return gph_json,200
    except:
        return {"success":False},400
    

# Route for forecast graph
@server.route('/forecastgraph',methods = ['GET','POST'])
@cross_origin(supports_credentials=True) 
def forecast():
    if request.method == 'POST':
        try:
            data = request.get_json()
            n = data['clicks']
            n_days = data['ndays']
            val = data['symbol']

            if n == None:
                return [""]
            if val == None:
                raise PreventUpdate
            fig = prediction(val, int(n_days) + 1)
            gph_json = pio.to_json(fig)
            
            return gph_json,200
        except:
            return {"success":False},400

# Route for top gainers losers NSE/BSE 
@server.route("/gainlose",methods = ["POST","GET"])
def gainers_losers():
    return {
    "nse_top_gainers":top_gainers,
    "ntg_ltp":ltp,
    "ntg_change":change,
    "ntg_change_percent":change_percent,
    "ntg_volume":volume,
    "ntg_day_low":day_low,
    "ntg_day_high":day_high,

    "nse_top_losers":top_losers,
    "ntl_ltp":ntl_ltp,
    "ntl_change":ntl_change,
    "ntl_change_percent":ntl_change_percent,
    "ntl_volume":ntl_volume,
    "ntl_day_low":ntl_day_low,
    "ntl_day_high":ntl_day_high,

    "bse_top_gainers":bse_top_gainers,
    "btg_ltp":btg_ltp,
    "btg_change":btg_change,
    "btg_change_percent":btg_change_percent,
    "btg_volume":btg_volume,
    "btg_day_low":btg_day_low,
    "btg_day_high":btg_day_high,

    "bse_top_losers":bse_top_losers,
    "btl_ltp":btl_ltp,
    "btl_change":btl_change,
    "btl_change_percent":btl_change_percent,
    "btl_volume":btl_volume,
    "btl_day_low":btl_day_low,
    "btl_day_high":btl_day_high

}

if __name__ == '__main__':
    server.run(debug=True)
   
