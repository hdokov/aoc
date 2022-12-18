$valves = File.read('16.txt').lines.to_h { [_1[6..7], [_1[/\d+/].to_i, _1[/to \w+ (.*)/, 1].split(', ')]] }

def flow(open) = open.uniq.map { |k| $valves[k][0] }.sum

def go(t, a, b, s, seen, open, move_one, &)
  yield s if t == 1
  return if t == 1 || seen.fetch([a, b, t], -1) >= s
  seen[[a, b, t]] = s

  possible = (!open.index(a) && $valves[a][0] > 0 ? [[a, open + [a]]] : []) + $valves[a][1].map { [_1, open] }
  possible = [[a, open]] unless move_one

  possible.each do |a, open|
    go(t - 1, a, b, s + flow(open + [b]), seen, open + [b], move_one, &) if !open.index(b) && $valves[b][0] > 0
    $valves[b][1].each { |b| go(t - 1, a, b, s + flow(open), seen, open, move_one, &) }
  end
end

p enum_for(:go, 30, 'AA', 'AA', 0, {}, [], false).max
p enum_for(:go, 26, 'AA', 'AA', 0, {}, [], true).max