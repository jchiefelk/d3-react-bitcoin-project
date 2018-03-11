<h1>d3-react-bitcoin-project</h1>

<p>
Combined React.js and D3.js to make pretty plots of Bitcoin historical price data and analysis plots that render faster than Google Chats to the virtual DOM.
</p>

<h3>Installing Node Dependencies</h3>
<pre>
git clone https://github.com/jchiefelk/d3-react-bitcoin-project.git
npm install 
</pre>

<p>NOTE: This Web App also relies on a C++ add-on that runs asychronous V8 in a seperate thread.  I did this speed up 
the comutation of the Price Autocorrelation</p>

<h3>Compiling C++ add-on</h3>

<pre>
node-gyp configure
bode-gyp build
</pre>

<h3>Running Application Locally</h3>

<pre>
node app.js
</pre>
