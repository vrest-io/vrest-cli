# vrest-cli

1. Exports the records (test cases/ API mocks) which are stored in [vREST](https://vrest.io).
2. Import records in [vREST](https://vrest.io).
3. This utility can be useful to maintain backup / version control of your vREST records.

#### Prerequisites:
* Node.js - Download and Install [Node.js](https://nodejs.org/en/download/). You can also follow this wiki (https://nodejs.org/en/download/package-manager/)

#### Installation / Update:
  sudo npm install -g vrest-cli

* sudo is optional. For windows, remove sudo from the above command.

#### Usage:
  vrest-cli --email=<vrest_email> --password=<vrest_password> [--apicall="<name_of_api>"]

#### Options:
        -e, --email      : Email ID through which you have registered on vREST
        -p, --password   : Password of your vREST account
        -a, --apicall    : API call to invoke. Supported values are import, export.
Note: Each API call has their own set of arguments.

### API Calls:
The following APIs are supported:

1. **export**
    To export vREST test cases. This API call accepts the following additional arguments:

        -u, --url          : Provide the test case list URL here. You can find
                             the test case list URL by going to your vREST
                             instance and select Test Cases tab. Now click on
                             button "Copy Current Test Case List URL" available
                             in Left hand side, below the "Filters section".
                             Provide the copied URL in this option. Ensure that
                             you enclose URL in double quotes.
        -f, --filepath     : [Optional] Absolute file path where records should
                             be exported
2. **import**
    To import vREST test cases. This API call accepts the following additional arguments:

        -U --url           : Provide the test case list URL here. This tool
                             will extract the instance and project id from the
                             URL.
        -f, filepath       : Absolute file path from where the records to be
                             imported
        -t, --testsuiteid  : test suite id into which records will be imported.
        -s,--selectedtestsuite: Value can be 1 or 0. If value is 1 then records
                             will inserted into the specified testsuiteid
                             otherwise it will use the test suite id from the
                             exported file.
         -c, --create      : Value can be 1 or 0. If value is 1 then new
                             records will be created otherwise existing records
                             will be updated.
         -m, --from        : Value can be json, swagger or postman.
3. More APIs later, stay tuned ...
