# Renewable Feedstock Dashboard — Pitch

**The pitch**:
Hey Jasper,
this is a live price monitor for the feedstocks you trade sutch as HVO(Hydrotreated Vegetable Oil) and UCO(Used Cooking Oil) — updating on its own in near real time, so you always see where the market is without chasing tabs or spreadsheets.
It pulls prices as they come in, in the table on the top, and shows you the history of any product you pick on the bottom. 
You will also find a connection sygnal within the table, that will tell you whether the connection is live, so you know the numbers are current, not hours old. If you're making calls based on commodity prices, this replaces the spreadsheet you're refreshing by hand.

**The cut**
I looked into adding a candlestick chart — the kind of chart traders are used to seeing — but it requires open, high, low, and close price points for each period, and while that might be possible to derive from the data we receive, it takes quite some work and testing to get there reliably, so I didn't continue in that direction.

**The truth**
The chart is not yet usable — it gives you a feel for what it would look like, but the data coming in has duplicates and gaps that need cleaning before it's something you'd trust. That's the next step.


