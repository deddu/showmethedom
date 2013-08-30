#apt-get install gcc g++ make
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
. ~/.bashrc
mkdir ~/local
mkdir ~/node-latest-install
cd ~/node-latest-install
curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
./configure --prefix=~/local
make install # ok, fine, this step probably takes more than 30 seconds...
curl https://npmjs.org/install.sh | sh
cd ~
git clone https://github.com/deddu/showmethedom.git
cd showmethedom
npm install -g yo
npm install
bower install
