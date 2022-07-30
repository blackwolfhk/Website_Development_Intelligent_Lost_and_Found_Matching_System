aws configure
AKIA4DE7OE2XN6RQWIH7
CYP2fSseNyyt00l63vPCRS754NIiMugDv61E16Q9

ap-southeast-1

yarn build

cd build

aws s3 sync . s3://react.cityhunterhk.com

Note:
REACT_APP_API_HOST = https://cityhunterhk.com
