## stats.rb

This ruby script can be used to generate public stats in static HTML format from heavy loads of server logs in the [common log format](http://publib.boulder.ibm.com/tividd/td/ITWSA/ITWSA_info45/en_US/HTML/guide/c-logs.html#common) or combined log format.

## Data

This script will save gzipped anonymized log lines included in the stats in directory specified in the configuration. This data can later be used as a backup to rebuild the stats from scratch, additional log lines are appended every time the script is executed.

This script will also save a SQLite database. This database only contains required data to generate the final HTML files and the timestamp of the last imported log line so the script can later resume and only import new data.

## Dependencies

Installing dependencies on Ubuntu 14.04:

    sudo apt-get install libsqlite3-dev
    sudo gem install sqlite3 geoip

## Configuration

A few constants can be edited within the file:

**WEBSITENAME** : This constant is used to display your website name on the final HTML stats pages.

**ACCEPTPAGE** : This constant is a regex that defines what pages are included in the stats. This regex should **not** allow spaces since spaces delimit data in the logs.

**DBPATH** : This constant defines where the database and gzipped filtered logs can be found (or created on first start).

**LOGSPATH** : This constant defines where the access.log files are located (usually /var/log/nginx or /var/log/apache2).

**WEBPATH** : This constant defines where to output the final public HTML stats files.

**GEOIPPATH** : This constant defines where to find GeoIP.dat for geolocation.

