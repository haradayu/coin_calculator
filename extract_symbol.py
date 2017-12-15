#!/usr/bin/env python
# -*- coding: utf-8 -*-
import argparse
import sys
import json

def main():
	f = open("ticker.json", "r")
	json_obj = json.load(f)
	coin_dict = {}
	for each_coin in json_obj:
		coin_dict[each_coin[u"symbol"]] = each_coin[u"id"]
	f2 = open("symbol_id.json","w")
	json.dump(coin_dict, f2)
	sys.exit(0)

if __name__ == '__main__':
	main()
